import toyBearGold from "@/assets/toy-bear-gold.jpg";
import toyRobotBlack from "@/assets/toy-robot-black.jpg";
import toyBunnyBronze from "@/assets/toy-bunny-bronze.jpg";
import toyCatNoir from "@/assets/toy-cat-noir.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  collection: string;
}

export const products: Product[] = [
  {
    id: "golden-bear",
    name: "Golden Bear",
    price: 89.99,
    image: toyBearGold,
    description: "Premium metallic gold finish bear figure, handcrafted with attention to detail.",
    collection: "Metallic Series",
  },
  {
    id: "noir-bot",
    name: "Noir Bot",
    price: 119.99,
    image: toyRobotBlack,
    description: "Sleek matte black robot with gold chrome accents. Limited edition.",
    collection: "Tech Collection",
  },
  {
    id: "bronze-bunny",
    name: "Bronze Bunny",
    price: 79.99,
    image: toyBunnyBronze,
    description: "Adorable copper-bronze bunny sculpture with artistic finish.",
    collection: "Metallic Series",
  },
  {
    id: "shadow-cat",
    name: "Shadow Cat",
    price: 99.99,
    image: toyCatNoir,
    description: "Elegant matte black cat with subtle gold ear accents.",
    collection: "Noir Collection",
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
