

import {Injectable} from "@nestjs/common";

@Injectable()
export class ProductsRepository {

  private products = [

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

  ];

  /* Obtener todos los productos*/
  async getProducts() {

    return this.products;

  }

}