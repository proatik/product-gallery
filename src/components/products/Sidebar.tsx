"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// data.
import { categories } from "@/data/categories";

type FormValues = {
  priceMax: number;
  priceMin: number;
  categories: boolean[];
  availability: boolean[];
};

type QueryParams = {
  priceMin?: number;
  priceMax?: number;
  category?: string;
  availability?: string;
};

const initialValues: FormValues = {
  priceMin: 0,
  priceMax: 100_000,
  availability: [false, false],
  categories: Array(categories.length).fill(false),
};

const Sidebar = ({ small }: { small?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setError] = useState({ min: false, max: false });

  const { watch, register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const isValid = (price: number) => price >= 0 && price <= 100_000;

  // working. ✅
  const updateSearchParams = ({
    priceMax,
    priceMin,
    categories,
  }: {
    priceMin: number;
    priceMax: number;
    categories: boolean[];
  }): QueryParams => {
    const category = categories
      .map((cat: boolean, index: number) => (cat ? index + 1 : 0))
      .filter((cat: number) => cat > 0);

    const query: QueryParams = {};

    if (isValid(priceMin)) query.priceMin = priceMin;
    if (isValid(priceMax)) query.priceMax = priceMax;
    if (category?.length) query.category = category.join(",");

    return query;
  };

  // working. ✅
  const parseSearchParams = () => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const category = searchParams.get("category");
    const availability = searchParams.get("availability");

    const query: {
      priceMin?: string;
      priceMax?: string;
      categories?: boolean[];
      availability?: boolean[];
    } = {};

    if (priceMin) query.priceMin = priceMin;
    if (priceMax) query.priceMax = priceMax;

    if (category) {
      const check = Array(categories.length).fill(false);

      category.split(",").forEach((cat) => {
        check[parseInt(cat) - 1] = true;
      });

      query.categories = check;
    }

    if (availability) {
      const check = [false, false];

      availability === "in-stock" ? (check[0] = true) : (check[1] = true);

      query.availability = check;
    }

    return query;
  };

  // working. ✅
  useEffect(() => {
    const subscription = watch((value) => {
      setValues(value as FormValues);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // working. ✅
  useEffect(() => {
    const { priceMax, priceMin, availability } = values;
    setError({ min: !isValid(priceMin), max: !isValid(priceMax) });

    const query = updateSearchParams(values);
    const updatedParams = new URLSearchParams();

    for (const [key, val] of Object.entries(query)) {
      updatedParams.set(key, val.toString());
    }

    const search = searchParams.get("search");
    if (search) updatedParams.set("search", search);

    const [ins, ofs] = availability;

    if ((ins && !ofs) || (!ins && ofs)) {
      if (ins) updatedParams.set("availability", "in-stock");
      else if (ofs) updatedParams.set("availability", "out-of-stock");
    }

    router.push(`${pathname}?${updatedParams.toString()}`);
  }, [values]);

  // working. ✅
  useEffect(() => {
    const { priceMin, priceMax, categories, availability } =
      parseSearchParams();

    if (priceMin) setValue("priceMin", parseInt(priceMin));
    if (priceMax) setValue("priceMax", parseInt(priceMax));
    if (availability) setValue("availability", availability);
    if (categories) setValue("categories", categories);
  }, []);

  return (
    <div
      className={`px-4 pb-6 bg-white rounded shadow ${
        small ? "block" : "hidden md:block"
      }`}
    >
      <div className="space-y-5 divide-y divide-gray-200">
        <form onSubmit={handleSubmit((v) => console.log(v))}>
          {/* price range */}
          <div className="pt-4">
            <h3 className="mb-3 text-base font-medium text-gray-800 uppercase">
              Price Range
            </h3>
            <div className="flex items-center mt-4">
              <input
                min={0}
                max={100_000}
                type="number"
                className={`w-full p-1 text-gray-600 border border-transparent rounded shadow-sm focus:border-teal-600 focus:outline-none ${
                  errors.min ? "bg-red-200 focus:border-transparent" : ""
                }`}
                {...register("priceMin", {
                  min: 0,
                  max: 100_000,
                  valueAsNumber: true,
                })}
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                min={0}
                max={100_000}
                type="number"
                className={`w-full p-1 text-gray-600 border border-transparent rounded shadow-sm focus:border-teal-600 focus:outline-none ${
                  errors.max ? "bg-red-200 focus:border-transparent" : ""
                }`}
                {...register("priceMax", {
                  min: 0,
                  max: 100_000,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          {/* availability */}
          <div className="pt-4">
            <h3 className="mb-3 text-base font-medium text-gray-800 uppercase">
              Availability
            </h3>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.0"
                  className="rounded-sm cursor-pointer accent-teal-600 focus:outline-none peer"
                  {...register("availability.0")}
                />
                <label
                  htmlFor="availability.0"
                  className="ml-3 text-gray-600 cursor-pointer peer-checked:text-teal-600"
                >
                  In Stock
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.1"
                  className="rounded-sm cursor-pointer accent-teal-600 focus:outline-none peer"
                  {...register("availability.1")}
                />
                <label
                  htmlFor="availability.1"
                  className="ml-3 text-gray-600 cursor-pointer peer-checked:text-teal-600"
                >
                  Out of Stock
                </label>
              </div>
            </div>
          </div>

          {/* categories */}
          <div className="pt-4">
            <h3 className="mb-3 text-base font-medium text-gray-800 uppercase">
              Categories
            </h3>

            <div className="space-y-2">
              {categories?.map(({ id, name }, index) => (
                <div key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`categories.${index}`}
                    {...register(`categories.${index}`)}
                    className="rounded-sm cursor-pointer accent-teal-600 focus:outline-none peer"
                  />
                  <label
                    htmlFor={`categories.${index}`}
                    className="ml-3 text-gray-600 cursor-pointer peer-checked:text-teal-600"
                  >
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
