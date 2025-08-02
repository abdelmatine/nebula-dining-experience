import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RealEmailVerification } from '@/components/RealEmailVerification';
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector';

interface CheckoutFormProps {
  total: number;
  onSuccess: () => void;
}

export const CheckoutForm = ({ total, onSuccess }: CheckoutFormProps) => {
  const { toast } = useToast();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'delivery' | 'card' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryTime: '',
    specialInstructions: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailVerified = () => {
    toast({
      title: "Order Placed Successfully!",
      description: `Thank you ${formData.name}! Your order will be delivered to ${formData.address}.`,
    });

    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handlePaymentMethodSelect = (method: 'delivery' | 'card', details?: any) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethod(false);
    setShowEmailVerification(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show payment method selection
    setShowPaymentMethod(true);
  };

  const finalTotal = total + (total * 0.085) + 2.99;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-space-grotesk">Checkout Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Delivery Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Main St, Apt 4B"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="New York"
                required
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="10001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
            <Select onValueChange={(value) => handleInputChange('deliveryTime', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP (30-45 mins)</SelectItem>
                <SelectItem value="1hour">In 1 hour</SelectItem>
                <SelectItem value="2hours">In 2 hours</SelectItem>
                <SelectItem value="evening">This evening (6-8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Ring doorbell, leave at door, etc."
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8.5%):</span>
                <span>${(total * 0.085).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee:</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              Continue to Payment
            </Button>
          </div>
        </form>
      </CardContent>
      
      {/* Payment Method Selection */}
      {showPaymentMethod && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <PaymentMethodSelector
                onPaymentMethodSelect={handlePaymentMethodSelect}
                total={total}
              />
            </div>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      <RealEmailVerification
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={formData.email}
        onVerified={handleEmailVerified}
        type="order"
      />
    </Card>
  );
};