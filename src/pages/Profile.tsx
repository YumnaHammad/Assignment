import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Mail, Phone, Globe, MapPin, Building, ShieldCheck } from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-end gap-6 mb-8 mt-4">
        <div className="h-32 w-32 rounded-full border-4 border-background bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-lg">
          {currentUser.name.charAt(0)}
        </div>
        <div className="pb-2">
          <h1 className="text-3xl font-bold tracking-tight">{currentUser.name}</h1>
          <p className="text-muted-foreground text-lg">@{currentUser.username}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.website}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {currentUser.address.street}, {currentUser.address.suite} <br />
              {currentUser.address.city}, {currentUser.address.zipcode}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" /> Company Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border">
              <div className="h-16 w-16 rounded bg-primary/10 flex items-center justify-center">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{currentUser.company.name}</h4>
                <p className="text-sm italic text-muted-foreground">"{currentUser.company.catchPhrase}"</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{currentUser.company.bs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
