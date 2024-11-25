

import {Injectable} from "@nestjs/common";
import { Product } from "./product.interface";

@Injectable()
export class ProductsRepository {

  private products: Product [] = [

    {

      id: 1,
      name: "Turntable",
      description: "High-quality turntable for vinyl enthusiasts.",
      price: 1500,
      stock: true,
      imgUrl: "https://example.com/images/turntable.jpg",

    },

    {

      id: 2,
      name: "Amplifier",
      description: "Powerful amplifier with rich sound.",
      price: 3000,
      stock: false,
      imgUrl: "https://example.com/images/amplifier.jpg",

    },

    {

      id: 3,
      name: "Speaker",
      description: "Compact speaker with excellent sound quality.",
      price: 2000,
      stock: true,
      imgUrl: "https://example.com/images/speaker.jpg",

    },

    {

      id: 4,
      name: "Headphones",
      description: "Noise-cancelling headphones with immersive sound.",
      price: 800,
      stock: true,
      imgUrl: "https://example.com/images/headphones.jpg",

    },

    {

      id: 5,
      name: "Microphone",
      description: "Studio-grade microphone for professional recordings.",
      price: 1200,
      stock: true,
      imgUrl: "https://example.com/images/microphone.jpg",

    },

    {

      id: 6,
      name: "Subwoofer",
      description: "Deep bass subwoofer for a full sound experience.",
      price: 1800,
      stock: false,
      imgUrl: "https://example.com/images/subwoofer.jpg",

    },

    {

      id: 7,
      name: "Mixer",
      description: "Professional audio mixer for DJs and sound engineers.",
      price: 2500,
      stock: true,
      imgUrl: "https://example.com/images/mixer.jpg",

    },

    {

      id: 8,
      name: "Bluetooth Receiver",
      description: "Wireless Bluetooth receiver for high-fidelity audio.",
      price: 500,
      stock: true,
      imgUrl: "https://example.com/images/bluetooth-receiver.jpg",

    },

    {

      id: 9,
      name: "Turntable Needle",
      description: "Replacement needle for turntables, ensuring quality playback.",
      price: 100,
      stock: true,
      imgUrl: "https://example.com/images/turntable-needle.jpg",

    },

    {

      id: 10,
      name: "Soundbar",
      description: "Sleek soundbar for home theater setups.",
      price: 2200,
      stock: false,
      imgUrl: "https://example.com/images/soundbar.jpg",

    }

  ];
  

  /* Obtener todos los productos*/
  async getProducts() {

    return this.products;

  }

  async getById(id: number) {

    return this.products.find (product => product.id === id);

  }

  async createProduct (product: Omit <Product, "id">): Promise < {id: number}>  {

    const id = this.products.length + 1;

    this.products = [...this.products, {id, ... product}];

    return {id};

  }

  async updateProduct (id: number, updateData: Partial <Product>): Promise < {id: number}> {

    const product = this.products.find (product => product.id === id );

    if (!product) {

      throw new Error ("Product not found");

    }

    Object.keys(updateData).forEach(key => {

      if (key in product && key !== 'id') {

          (product as any)[key] = (updateData as any)[key];

      }
      
    });

    // Retornar el usuario actualizado
    return {id};

  }

  async deleteProduct (id: number): Promise <{id: number}> {

    const product = this.products.findIndex (product => product.id === id );

    if (product === -1) {

      throw new Error ("Product not found");
  
    }

    this.products.splice (product, 1);

    return {id};

  }

  async getPaginatedProducts (page: number = 1, limit: number = 5): Promise< {

    products: Omit<Product, "password"> [];
    totalProducts: number;
    totalPages: number;
    currentPage: number;

  } > {

        const totalProducts = this.products.length;
        const totalPages = Math.ceil (totalProducts / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        console.log ("Repository: Total Products =", totalProducts);
        console.log (`Repository: StartIndex=${startIndex}, EndIndex=${endIndex}`);

        const products = this.products.slice (startIndex, endIndex).map (({ ...product }) => product);

        console.log ("Repository: Paginated Users =", products);

        return {
          
          products,
          totalProducts,
          totalPages,
          currentPage: page,

        };

    }

}