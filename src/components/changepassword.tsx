'use client'

import { useState } from 'react'
import { Lock, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AxiosInstance from '@/utils/axios'
import { useUser } from "../utils/usercontext";
import { useNavigate } from 'react-router-dom'

export function SecuritySettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const { clearUserDetails } = useUser();
  const router = useNavigate();
  // Logout function
  const handleLogoutButton = async () => {
    try {
      clearUserDetails(); // Clear user context
      localStorage.removeItem("userDetails"); // Remove from storage
      localStorage.removeItem("token"); 
      router("/signin"); // Redirect to sign-in
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Change Password function
  const handleChangePassword1 = async (currentPassword: string, newPassword: string, confirmNewPassword: string) => {
    try {
      if (newPassword !== confirmNewPassword) {
        alert("New password and confirm password do not match.");
        return null;
      }

      const token = document.cookie.split("=")[1];
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await AxiosInstance.post(
        "update/updatepassword",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change the password. Please try again.");
      return null;
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the API function to handle the password change
    const result = await handleChangePassword1(currentPassword, newPassword, confirmNewPassword);

    if (result) {
      alert("Password changed successfully!");
      setIsDialogOpen(false); // Close dialog
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="text-lg font-semibold">Security Settings</CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full justify-start"
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
          <Button className="w-full justify-start text-red-600" onClick={handleLogoutButton} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
