import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Truck, Calendar, Lock } from "lucide-react";

interface PaymentMethodSelectorProps {
  onPaymentMethodSelect: (method: 'delivery' | 'card', details?: any) => void;
  total: number;
}

export const PaymentMethodSelector = ({ onPaymentMethodSelect, total }: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'delivery' | 'card' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleCardPayment = () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      return;
    }
    onPaymentMethodSelect('card', cardDetails);
  };

  const handleDeliveryPayment = () => {
    onPaymentMethodSelect('delivery');
  };

  if (!selectedMethod) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-alex-brush text-gradient-primary">Choose Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
            onClick={() => setSelectedMethod('delivery')}
          >
            <CardHeader className="text-center">
              <Truck className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Pay on Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm">
                Pay cash when your order arrives
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                + €2.00 cash handling fee
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
            onClick={() => setSelectedMethod('card')}
          >
            <CardHeader className="text-center">
              <CreditCard className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Pay by Card</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm">
                Secure online payment
              </p>
              <p className="text-xs text-green-600 mt-2">
                No additional fees
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'delivery') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-alex-brush text-gradient-primary">Pay on Delivery</h3>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Delivery fee:</span>
                <span>€3.50</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Cash handling fee:</span>
                <span>€2.00</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>€{(total + 3.50 + 2.00).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedMethod(null)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleDeliveryPayment} className="flex-1">
                Confirm Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-alex-brush text-gradient-primary">Card Payment</h3>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">Secure SSL encrypted payment</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg my-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Delivery fee:</span>
              <span>€3.50</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>€{(total + 3.50).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedMethod(null)} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={handleCardPayment} 
              className="flex-1"
              disabled={!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay €{(total + 3.50).toFixed(2)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};