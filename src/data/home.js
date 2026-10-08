import ramenIcon from '../../images/iteration-2-images/icons/1.svg'
import pizzaIcon from '../../images/iteration-2-images/icons/2.svg'
import burgerIcon from '../../images/iteration-2-images/icons/3.svg'
import friesIcon from '../../images/iteration-2-images/icons/4.svg'
import fastFoodIcon from '../../images/iteration-2-images/icons/5.svg'
import drinkIcon from '../../images/iteration-2-images/icons/6.svg'
import food1 from '../../images/iteration-2-images/pictures/food-1.png'
import food2 from '../../images/iteration-2-images/pictures/food-2.png'
import food3 from '../../images/iteration-2-images/pictures/food-3.png'

export const CATEGORIES = [
  { id: 'ramen', navLabel: 'YENİ! Kore', label: 'Ramen', icon: ramenIcon },
  { id: 'pizza', navLabel: 'Pizza', label: 'Pizza', icon: pizzaIcon },
  { id: 'burger', navLabel: 'Burger', label: 'Burger', icon: burgerIcon },
  { id: 'fries', navLabel: 'Kızartmalar', label: 'French fries', icon: friesIcon },
  { id: 'fastfood', navLabel: 'Fast food', label: 'Fast food', icon: fastFoodIcon },
  { id: 'drinks', navLabel: 'Gazlı İçecek', label: 'Soft drinks', icon: drinkIcon },
]

export const PRODUCTS = [
  { id: 1, name: 'Terminal Pizza', category: 'pizza', rating: 4.9, reviewCount: 200, price: 60, image: food1 },
  { id: 2, name: 'Position Absolute Acı Pizza', category: 'pizza', rating: 4.9, reviewCount: 928, price: 85, image: food2 },
  { id: 3, name: 'useEffect Tavuklu Burger', category: 'burger', rating: 4.9, reviewCount: 462, price: 75, image: food3 },
]
