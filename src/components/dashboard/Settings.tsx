'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Lock, Globe, Eye, Smartphone, Mail, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/components/language-provider";

export default function DashboardSettings() {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useTranslation();
    const [textSize, setTextSize] = useState("medium");
    
    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Email state
    const [newEmail, setNewEmail] = useState("");
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    // Apply text size to document
    useEffect(() => {
        const root = document.documentElement;
        switch (textSize) {
            case "small":
                root.style.fontSize = "14px";
                break;
            case "medium":
                root.style.fontSize = "16px";
                break;
            case "large":
                root.style.fontSize = "18px";
                break;
            default:
                root.style.fontSize = "16px";
        }
    }, [textSize]);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            toast.error(t("password_mismatch"));
            return;
        }
        // Mock API call
        toast.success(t("password_updated"));
        setIsPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleEmailChange = () => {
        if (!newEmail.includes("@")) {
            toast.error(t("invalid_email"));
            return;
        }
        // Mock API call
        toast.success(t("email_updated"));
        setIsEmailModalOpen(false);
        setNewEmail("");
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t("settings")}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t("settings_desc")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Aspetto e Tema */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            {t("appearance")}
                        </CardTitle>
                        <CardDescription>{t("appearance_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <div>
                                    <Label htmlFor="dark-mode" className="font-semibold">{t("dark_mode")}</Label>
                                    <p className="text-xs text-gray-500">{t("dark_mode_desc")}</p>
                                </div>
                            </div>
                            <Switch 
                                id="dark-mode" 
                                checked={theme === 'dark'} 
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Smartphone className="h-5 w-5" />
                                <div>
                                    <Label className="font-semibold">{t("text_size")}</Label>
                                    <p className="text-xs text-gray-500">{t("text_size_desc")}</p>
                                </div>
                            </div>
                            <Select value={textSize} onValueChange={setTextSize}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Seleziona" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="small">{t("small")}</SelectItem>
                                    <SelectItem value="medium">{t("medium")}</SelectItem>
                                    <SelectItem value="large">{t("large")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifiche */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-orange-500" />
                            {t("notifications")}
                        </CardTitle>
                        <CardDescription>{t("notif_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">{t("reminders")}</Label>
                                <p className="text-xs text-gray-500">{t("reminders_desc")}</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">{t("new_docs")}</Label>
                                <p className="text-xs text-gray-500">{t("new_docs_desc")}</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Sicurezza */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-red-500" />
                            {t("security")}
                        </CardTitle>
                        <CardDescription>{t("security_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">{t("password")}</Label>
                                <p className="text-xs text-gray-500">{t("password_last_change")}</p>
                            </div>
                            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">{t("change_password")}</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{t("change_password")}</DialogTitle>
                                        <DialogDescription>
                                            Inserisci la tua password attuale e la nuova password.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>{t("current_password")}</Label>
                                            <Input 
                                                type="password" 
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t("new_password")}</Label>
                                            <Input 
                                                type="password" 
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t("confirm_new_password")}</Label>
                                            <Input 
                                                type="password" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>{t("cancel")}</Button>
                                        <Button onClick={handlePasswordChange}>{t("save_changes")}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">{t("email")}</Label>
                                <p className="text-xs text-gray-500">{t("email_desc")}</p>
                            </div>
                            <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">{t("change_email")}</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{t("change_email")}</DialogTitle>
                                        <DialogDescription>
                                            Inserisci il nuovo indirizzo email. Riceverai un'email di conferma.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>{t("email")}</Label>
                                            <Input 
                                                type="email" 
                                                placeholder="nuova@email.com"
                                                value={newEmail}
                                                onChange={(e) => setNewEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>{t("cancel")}</Button>
                                        <Button onClick={handleEmailChange}>{t("send_confirmation")}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">{t("two_factor")}</Label>
                                <p className="text-xs text-gray-500">{t("two_factor_desc")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">{t("coming_soon")}</Badge>
                                <Button variant="outline" size="sm" disabled>{t("configure")}</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lingua e Regione */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-green-500" />
                            {t("language_region")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Languages className="h-5 w-5" />
                                <div>
                                    <Label className="font-semibold">{t("lang_interface")}</Label>
                                    <p className="text-xs text-gray-500">{t("lang_interface_desc")}</p>
                                </div>
                            </div>
                            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Lingua" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="it">Italiano</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
