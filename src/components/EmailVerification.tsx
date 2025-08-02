import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: () => void;
  type: "reservation" | "order";
}

export const EmailVerification = ({ isOpen, onClose, email, onVerified, type }: EmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 6-digit code
    if (verificationCode === "123456" || verificationCode.length === 6) {
      toast({
        title: "Email Verified!",
        description: `Your email has been verified successfully. Your ${type} is confirmed.`,
      });
      onVerified();
      onClose();
    } else {
      toast({
        title: "Invalid Code",
        description: "The verification code you entered is incorrect.",
        variant: "destructive"
      });
    }
    
    setIsVerifying(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email.",
    });
    
    setIsResending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-alex-brush text-center">
            Verify Your Email
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <div>
            <p className="text-muted-foreground mb-2">
              We've sent a 6-digit verification code to:
            </p>
            <p className="font-semibold">{email}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Email
                  </>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleResend}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            For demo purposes, use code: 123456
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};