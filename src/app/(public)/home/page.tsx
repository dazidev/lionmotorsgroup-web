import { titleFont } from "@/src/config/fonts";
import Image from "next/image";
import { Grid } from "../../../components";
import { getBrands } from "@/src/actions";
import ImageWithLoader from "../../../components/image/ImageWithLoader";

export default async function HomePage() {
  const brands = await getBrands();

  const dataBrands = brands.data;

  return (
    <main className="my-5">
      <h1 className="text-4xl font-bold">Available car brands</h1>
      <Grid>
        {dataBrands &&
          dataBrands.map((brand) => {
            const linkImage = `https://images.lionmotorsgroup.com/${brand.imagePath}`;
            return (
              <div
                key={brand.id}
                className="flex flex-col h-40 p-6 items-center justify-center gap-2 bg-stone-900 rounded-2xl shadow-2xl hover:scale-102 transition-transform duration-500 cursor-pointer"
              >
                <ImageWithLoader src={linkImage} alt={`logo-${brand.name}`} />
                <p>{brand.name}</p>
              </div>
            );
          })}
      </Grid>
    </main>
  );
}
