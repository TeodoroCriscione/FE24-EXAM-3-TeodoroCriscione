import { Product }  from './product.model';

export const  PRODUCTS: Product[] = [
{
   id: 1,
   name:  'iPhone 13 Pro Max',
   price: 39,
   description: '6.1-inch Super Retina XDR display with ProMotion.',
   imageUrl: 'iphone-13.jpg',
   category:  'Electronics',
   rating: 4.7,
   brand: 'Apple',
   quantity:  1,
   availability: true
},
{
   id:  2,
   name: 'Samsung Galaxy S23',
   price: 28,
   description:  'Dynamic AMOLED display, Snapdragon processor.',
   imageUrl:  'samsung-g.jpg',
   category: 'Electronics',
   rating: 4.5,
   brand:  'Samsung',
   quantity: 1 ,
   availability: false
   
},
{
   id:  3,
   name:  'Sony WH-1000XM5 Headphones',
   price: 32 ,
   description: 'Industry-leading noise cancellation with exceptional sound quality.',
   imageUrl: 'sony-headphones.jpg',
   category:  'Accessories',
   rating:  4.8,
   brand: 'Sony',
   quantity: 1,
   availability: true
},
{
   id:  4,
   name:  'Wow 2357i Headphones',
   price: 19 ,
   description: 'Industry-leading noise cancellation with exceptional sound quality.',
   imageUrl: 'headphones-other2.jpg',
   category:  'Accessories',
   rating:  4.7,
   brand: 'Wow',
   quantity: 1,
   availability: true
},
{
   id:  5,
   name:  'Apple iPad 20',
   price: 59 ,
   description: 'Yet another electronic device humanity does not need, but yet they force us to perceive it as indispensable.',
   imageUrl: 'apple-tablet.jpg',
   category:  'Accessories',
   rating:  5,
   brand: 'Apple',
   quantity: 1,
   availability: false
},
{
   id:  6,
   name:  'Tablet Lucky 178RH',
   price: 15 ,
   description: 'Super Retina XDR display with Some processor.',
   imageUrl: 'tablet-lucky.jpg',
   category:  'Accessories',
   rating:  3.7,
   brand: 'Lucky',
   quantity: 1,
   availability: true
}
];