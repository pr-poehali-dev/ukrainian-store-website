import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Липовий мед',
    category: 'Мед',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/72648a9f-a7f0-4298-9f04-068aaaf16934.jpg',
    description: 'Натуральний липовий мед з карпатських пасік'
  },
  {
    id: 2,
    name: 'Гречаний мед',
    category: 'Мед',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/72648a9f-a7f0-4298-9f04-068aaaf16934.jpg',
    description: 'Темний ароматний мед з гречки'
  },
  {
    id: 3,
    name: 'Малинове варення',
    category: 'Варення',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/d4d53c41-9e40-46b5-8eb0-cf2ce8eb0a82.jpg',
    description: 'Домашнє варення з свіжої малини'
  },
  {
    id: 4,
    name: 'Вишневе варення',
    category: 'Варення',
    price: 190,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/d4d53c41-9e40-46b5-8eb0-cf2ce8eb0a82.jpg',
    description: 'Густе варення з вишні з кісточками'
  },
  {
    id: 5,
    name: 'Квашена капуста',
    category: 'Соління',
    price: 120,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/9a937075-f3b3-4191-8608-5b8df212fb40.jpg',
    description: 'Хрустка квашена капуста за бабусиним рецептом'
  },
  {
    id: 6,
    name: 'Мариновані огірки',
    category: 'Соління',
    price: 140,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/9a937075-f3b3-4191-8608-5b8df212fb40.jpg',
    description: 'Хрусткі мариновані огірки з кропом'
  },
  {
    id: 7,
    name: 'Паляниця',
    category: 'Випічка',
    price: 85,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/72648a9f-a7f0-4298-9f04-068aaaf16934.jpg',
    description: 'Свіжа паляниця на заквасці'
  },
  {
    id: 8,
    name: 'Медівник',
    category: 'Випічка',
    price: 220,
    image: 'https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/72648a9f-a7f0-4298-9f04-068aaaf16934.jpg',
    description: 'Класичний медівник з вершковим кремом'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/221388ec-d43b-4426-942b-e7c6acbc107d.png" 
                alt="J&M Market" 
                className="h-20 w-20 object-contain"
              />
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['home', 'catalog', 'about', 'delivery', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Головна'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'Про нас'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакти'}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl">Кошик</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Кошик порожній</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} грн</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Всього:</span>
                        <span>{cartTotal} грн</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформити замовлення
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="relative bg-gradient-to-br from-[#005BBB] via-[#0066CC] to-[#FFD700] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://cdn.poehali.dev/projects/288f571d-8f1f-4e0a-84aa-63f37e20b4e8/files/ab6904d8-2eb0-4aa6-a5ed-0efed8c27964.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-8xl md:text-9xl mb-8 drop-shadow-lg" style={{ color: '#D4A574', fontWeight: 'bold' }}>
              𝐉&amp;𝐌 𝐌𝐚𝐫𝐤𝐞𝐭
            </h2>
            <p className="text-2xl md:text-3xl mb-10 text-white font-semibold drop-shadow-md">
              Натуральні продукти від українських виробників. Мед, варення, соління, свіжа випічка — все що любить ваша родина
            </p>
            <Button size="lg" className="text-xl px-12 py-6 bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold shadow-2xl hover:scale-105 transition-transform" onClick={() => scrollToSection('catalog')}>
              Переглянути каталог
              <Icon name="ArrowRight" size={24} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-primary">Наші продукти</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} грн</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Додати в кошик
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-primary">Про нас</h2>
            <p className="text-lg text-foreground/80 mb-4">
              J&M Market — це інтернет-магазин української продукції, створений з любов'ю до справжніх смаків. 
              Ми працюємо безпосередньо з виробниками з різних регіонів України, щоб принести вам найкращі продукти.
            </p>
            <p className="text-lg text-foreground/80">
              Наш мед збирають на пасіках Карпат, варення готують за традиційними рецептами, 
              а випічку печуть щодня зі свіжих інгредієнтів. Кожен продукт проходить ретельний відбір.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-12 text-primary">Доставка і оплата</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="Truck" size={24} />
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>🚚 Нова Пошта — від 1 дня</p>
                  <p>📦 Укрпошта — 2-5 днів</p>
                  <p>🏠 Кур'єром по Києву — 1 день</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Безкоштовна доставка при замовленні від 500 грн
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="CreditCard" size={24} />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>💳 Картою онлайн</p>
                  <p>💰 Готівкою при отриманні</p>
                  <p>🏦 Переказ на карту</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Всі способи оплати безпечні та зручні
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8 text-primary">Контакти</h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-center gap-3 text-lg">
                  <Icon name="Phone" size={20} />
                  <a href="tel:+380501234567" className="hover:text-primary transition-colors">
                    +38 (050) 123-45-67
                  </a>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-center gap-3 text-lg">
                  <Icon name="Mail" size={20} />
                  <a href="mailto:info@jmmarket.ua" className="hover:text-primary transition-colors">
                    info@jmmarket.ua
                  </a>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-center gap-3 text-lg">
                  <Icon name="MapPin" size={20} />
                  <span>м. Київ, вул. Хрещатик, 1</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://cdn.poehali.dev/files/221388ec-d43b-4426-942b-e7c6acbc107d.png" 
              alt="J&M Market" 
              className="h-20 w-20 object-contain"
            />
            <h3 className="text-3xl font-bold" style={{ color: '#D4A574', fontFamily: 'Pacifico, cursive' }}>
              J&M Market
            </h3>
          </div>
          <p className="text-sm opacity-80">
            © 2024 J&M Market. Смак справжньої України
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;