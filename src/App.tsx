import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreeInteractiveDesserts } from './components/ThreeInteractiveDesserts';
import { CategorySection } from './components/CategorySection';
import { BakeryStory } from './components/BakeryStory';
import { BestSellers } from './components/BestSellers';
import { CakeConfigurator } from './components/CakeConfigurator';
import { SpecialOffer } from './components/SpecialOffer';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Toast } from './components/Toast';
import { Product, CartItem, CakeConfig } from './types';
import { PRODUCTS } from './data/bakeryData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Custom cake order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [submittedOrderConfig, setSubmittedOrderConfig] = useState<CakeConfig | null>(null);
  const [submittedOrderTotal, setSubmittedOrderTotal] = useState<number>(899);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastImage, setToastImage] = useState<string | undefined>(undefined);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string, image?: string) => {
    setToastMessage(message);
    setToastImage(image);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  };

  // Add to cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    showToast(`Added ${product.name} to basket!`, product.image);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout cart flow
  const handleCheckoutCart = (finalTotal: number) => {
    // Generate a pseudo cake config representation for the cart checkout
    const cartSummary = cartItems
      .map((i) => `${i.product.name} (x${i.quantity})`)
      .join(', ');

    const checkoutConfig: CakeConfig = {
      customerName: 'Sweet Foodie',
      customerPhone: '7558239803',
      customerEmail: 'khanfareena828@gmail.com',
      cakeType: `Basket Order: ${cartItems.length} items`,
      size: '1 kg',
      flavor: 'Assorted Gourmet Bakes',
      filling: 'Chef Selection',
      frosting: 'Silk Cream',
      themeColor: 'Pastel Pink & Pearls',
      isEggless: true,
      cakeMessage: cartSummary,
      quantity: 1,
      deliveryDate: new Date().toISOString().split('T')[0],
      specialInstructions: `Items: ${cartSummary}`,
      hasSprinkles: true,
      hasCandles: false,
      hasEdibleFlowers: false,
    };

    setSubmittedOrderConfig(checkoutConfig);
    setSubmittedOrderTotal(finalTotal);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  // Custom cake order placed from configurator
  const handlePlaceCustomOrder = (config: CakeConfig, totalPrice: number) => {
    setSubmittedOrderConfig(config);
    setSubmittedOrderTotal(totalPrice);
    setIsOrderModalOpen(true);
  };

  const handleExploreTreats = () => {
    const el = document.getElementById('best-sellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartItemIds = cartItems.reduce((acc, item) => {
    acc[item.product.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FFF8F8] selection:bg-[#FCE1E8] selection:text-[#B84D67]">
      {/* Top Rounded Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCakeConfigurator={handleOpenConfigurator}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D WebGL Cupcake */}
        <HeroSection
          onExploreTreats={handleExploreTreats}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* 2. Interactive 3D Treats Studio Showcase */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <ThreeInteractiveDesserts />
        </section>

        {/* 3. Category Section */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            handleExploreTreats();
          }}
        />

        {/* 4. Bakery Story: Alternating Editorial Sections */}
        <BakeryStory />

        {/* 5. Best Sellers Grid */}
        <div id="cakes">
          <div id="cupcakes">
            <div id="cookies">
              <BestSellers
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onAddToCart={handleAddToCart}
                cartItemIds={cartItemIds}
              />
            </div>
          </div>
        </div>

        {/* 6. Special Promotional Offer (20% OFF) */}
        <SpecialOffer onOrderNow={handleOpenConfigurator} />

        {/* 7. "Design Your Dream Cake ♡" Configurator */}
        <CakeConfigurator onPlaceCustomOrder={handlePlaceCustomOrder} />

        {/* 8. Pinterest-Style Gallery */}
        <GallerySection />

        {/* 9. Customer Reviews */}
        <ReviewsSection />

        {/* 10. Contact & Location with TV Centre Address */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutCart}
        onExplore={handleExploreTreats}
      />

      {/* Cute Animated Order Confirmation Popup */}
      <OrderConfirmationModal
        isOpen={isOrderModalOpen}
        orderConfig={submittedOrderConfig}
        totalPrice={submittedOrderTotal}
        onClose={() => setIsOrderModalOpen(false)}
        onEditOrder={() => {
          setIsOrderModalOpen(false);
          handleOpenConfigurator();
        }}
      />

      {/* Cute Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        itemImage={toastImage}
      />
    </div>
  );
}
