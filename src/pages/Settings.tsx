import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Bell, Shield, Key } from 'lucide-react';
import { useStore } from '../store';

export const Settings: React.FC = () => {
  const { notify } = useStore();

  const handleSave = () => {
    notify("General settings updated successfully", 'success');
  };

  const handlePasswordUpdate = () => {
    notify("Password has been changed", 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account preferences and settings.</p>
      </div>

      <div className="grid gap-6">
        <Card className="transition-all hover:shadow-md border-border/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> General Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input defaultValue="admin_superuser" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input defaultValue="Admin User" />
              </div>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md border-border/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" />
              </div>
            </div>
            <Button variant="outline" onClick={handlePasswordUpdate}>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-muted-foreground">Receive daily summary emails.</p>
              </div>
              <input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts directly in the browser.</p>
              </div>
              <input type="checkbox" className="h-5 w-5 accent-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
