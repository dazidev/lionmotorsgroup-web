import { titleFont } from "@/src/config/fonts";
import Image from "next/image";
import { Grid } from "../../../components";
import { getBrands } from "@/src/actions";
import ImageWithLoader from "../../../components/image/ImageWithLoader";
import { redirect } from "next/navigation";
import { BrandCard } from "@/src/components/public/card/BrandCard";

export default async function HomePage() {
  const brands = await getBrands();

  const dataBrands = brands.data;

  return (
    <main className="my-5">
      <h1 className="text-4xl font-bold">Available car brands</h1>
      <Grid>
        {dataBrands &&
          dataBrands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
      </Grid>
    </main>
  );
}
