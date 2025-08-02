import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, RefreshCw, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RealEmailVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: () => void;
  type: "reservation" | "order";
}

export const RealEmailVerification = ({ isOpen, onClose, email, onVerified, type }: RealEmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { toast } = useToast();

  const sendVerificationCode = async () => {
    setIsSending(true);
    
    try {
      // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate and store verification code (in real implementation, store in database)
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem(`verification_${email}`, code);
      
      toast({
        title: "Verification Code Sent",
        description: `A 6-digit code has been sent to ${email}`,
      });
      
      setCodeSent(true);
    } catch (error) {
      toast({
        title: "Failed to Send Code",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

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
    
    try {
      // Check against stored code (in real implementation, verify against database)
      const storedCode = localStorage.getItem(`verification_${email}`);
      
      if (verificationCode === storedCode) {
        toast({
          title: "Email Verified!",
          description: `Your email has been verified successfully. Your ${type} is confirmed.`,
        });
        
        // Clean up stored code
        localStorage.removeItem(`verification_${email}`);
        
        onVerified();
        onClose();
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code you entered is incorrect.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
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
              We need to verify your email address:
            </p>
            <p className="font-semibold">{email}</p>
          </div>
          
          {!codeSent ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the button below to receive a verification code via email.
              </p>
              
              <Button 
                onClick={sendVerificationCode}
                disabled={isSending}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Verification Code
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to your email.
              </p>
              
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
                  onClick={sendVerificationCode}
                  disabled={isSending}
                  className="w-full"
                >
                  {isSending ? (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};