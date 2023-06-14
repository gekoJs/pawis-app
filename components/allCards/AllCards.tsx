// "use client";
import { Card, CardSkeleton } from "../index";
import s from "./AllCards.module.scss";
/*---------------------------------------------*/

export default function AllCards({
  dogs,
  loading,
}: {
  dogs: any;
  loading: any;
}) {
  return (
    <div className={s.container}>
      {loading
        ? Array.from({ length: 8 }, (e, i) => <CardSkeleton key={i} />)
        : dogs?.data?.map((e: any, i: any) => (
            <Card
              key={i}
              img={e.image}
              breed={e.breed}
              temperaments={e.Temperaments}
              weight={
                e.weight_min && e.weight_max
                  ? (e.weight_min + e.weight_max) / 2
                  : e.weight_min || e.weight_max
              }
            />
          ))}
    </div>
  );
}

export const array = [
  {
    id: 1,
    breed: "Affenpinscher",
    image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    height_min: 23,
    height_max: 29,
    weight_min: 3,
    weight_max: 6,
    lifeTime_min: 10,
    lifeTime_max: 12,
    Temperaments: [
      "Stubborn",
      "Curious",
      "Playful",
      "Adventurous",
      "Active",
      "Fun-loving",
    ],
    createdInDB: false,
  },
  {
    id: 2,
    breed: "Afghan Hound",
    image: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
    height_min: 64,
    height_max: 69,
    weight_min: 23,
    weight_max: 27,
    lifeTime_min: 10,
    lifeTime_max: 13,
    Temperaments: ["Aloof", "Clownish", "Dignified", "Independent", "Happy"],
    createdInDB: false,
  },
  {
    id: 3,
    breed: "African Hunting Dog",
    image: "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
    height_min: 76,
    weight_min: 20,
    weight_max: 30,
    lifeTime_min: 11,
    Temperaments: ["Wild", "Hardworking", "Dutiful"],
    createdInDB: false,
  },
  {
    id: 4,
    breed: "Airedale Terrier",
    image: "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
    height_min: 53,
    height_max: 58,
    weight_min: 18,
    weight_max: 29,
    lifeTime_min: 10,
    lifeTime_max: 13,
    Temperaments: [
      "Outgoing",
      "Friendly",
      "Alert",
      "Confident",
      "Intelligent",
      "Courageous",
    ],
    createdInDB: false,
  },
  {
    id: 5,
    breed: "Akbash Dog",
    image: "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
    height_min: 71,
    height_max: 86,
    weight_min: 41,
    weight_max: 54,
    lifeTime_min: 10,
    lifeTime_max: 12,
    Temperaments: ["Loyal", "Independent", "Intelligent", "Brave"],
    createdInDB: false,
  },
  {
    id: 6,
    breed: "Akita",
    image: "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
    height_min: 61,
    height_max: 71,
    weight_min: 29,
    weight_max: 52,
    lifeTime_min: 10,
    lifeTime_max: 14,
    Temperaments: [
      "Docile",
      "Alert",
      "Responsive",
      "Dignified",
      "Composed",
      "Friendly",
      "Receptive",
      "Faithful",
      "Courageous",
    ],
    createdInDB: false,
  },
];
