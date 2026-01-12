'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Lock, Globe, Eye, Smartphone } from "lucide-react";

export default function PatientSettings() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Impostazioni</h2>
                <p className="text-gray-500">Gestisci le tue preferenze e la sicurezza dell'account.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Aspetto e Tema */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            Aspetto
                        </CardTitle>
                        <CardDescription>Personalizza come visualizzi l'applicazione.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <div>
                                    <Label htmlFor="dark-mode" className="font-semibold">Tema Scuro</Label>
                                    <p className="text-xs text-gray-500">Attiva o disattiva il tema scuro per l'interfaccia.</p>
                                </div>
                            </div>
                            <Switch 
                                id="dark-mode" 
                                checked={theme === 'dark'} 
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                            <div className="flex items-center gap-4">
                                <Smartphone className="h-5 w-5" />
                                <div>
                                    <Label className="font-semibold text-gray-400">Dimensione Testo</Label>
                                    <p className="text-xs text-gray-400">Regola la dimensione dei caratteri (Prossimamente).</p>
                                </div>
                            </div>
                            <Badge variant="secondary">In arrivo</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifiche */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-orange-500" />
                            Notifiche
                        </CardTitle>
                        <CardDescription>Scegli come ricevere aggiornamenti sulla tua salute.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">Promemoria Visite</Label>
                                <p className="text-xs text-gray-500">Ricevi una notifica 24 ore prima di una visita programmata.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">Nuovi Documenti</Label>
                                <p className="text-xs text-gray-500">Avvisami quando un medico carica un nuovo referto o esame.</p>
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
                            Sicurezza
                        </CardTitle>
                        <CardDescription>Proteggi il tuo account e i tuoi dati sensibili.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">Password</Label>
                                <p className="text-xs text-gray-500">L'ultima modifica risale a 3 mesi fa.</p>
                            </div>
                            <Button variant="outline" size="sm">Cambia Password</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">Autenticazione a due fattori</Label>
                                <p className="text-xs text-gray-500">Aggiungi un ulteriore livello di sicurezza al tuo login.</p>
                            </div>
                            <Button variant="outline" size="sm">Configura</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Lingua e Regione */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-green-500" />
                            Lingua e Regione
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-semibold">Lingua interfaccia</Label>
                                <p className="text-xs text-gray-500">Seleziona la lingua per l'applicazione.</p>
                            </div>
                            <Button variant="ghost" className="font-semibold text-blue-600">Italiano</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
