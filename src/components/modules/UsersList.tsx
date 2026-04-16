import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { Modal } from '../common/Modal';
import type { User } from '../../types';
import { Mail, Phone, Globe, MapPin, Building } from 'lucide-react';

export const UsersList: React.FC = () => {
  const { users, loadingUsers, errorUsers, fetchUsers, searchQuery } = useStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loadingUsers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader size={48} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading users...</p>
      </div>
    );
  }

  if (errorUsers) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-8 text-center text-destructive">
        <h3 className="text-lg font-semibold">Error</h3>
        <p className="mt-2">{errorUsers}</p>
        <Button className="mt-4" onClick={() => fetchUsers()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="transition-all hover:shadow-md hover:-translate-y-1 overflow-hidden group cursor-pointer border-border/50" onClick={() => setSelectedUser(user)}>
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary/40 relative">
              <div className="absolute -bottom-10 left-6 h-20 w-20 rounded-full border-4 border-background bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground shadow-sm">
                {user.name.charAt(0)}
              </div>
            </div>
            <CardHeader className="pt-14 pb-2">
              <CardTitle className="text-lg turncate">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span className="truncate">{user.company.name}</span>
                </div>
              </div>
              <Button className="w-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No users found matching "{searchQuery}"
        </div>
      )}

      <Modal 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        title="User Profile"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                <p className="text-muted-foreground">@{selectedUser.username}</p>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact</h4>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedUser.website}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</h4>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">
                    {selectedUser.address.street}, {selectedUser.address.suite}<br/>
                    {selectedUser.address.city}, {selectedUser.address.zipcode}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Company</h4>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">{selectedUser.company.name}</p>
                  <p className="text-xs text-muted-foreground italic">"{selectedUser.company.catchPhrase}"</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
               <Button onClick={() => setSelectedUser(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
