import { Resolver, Mutation, Query, Arg } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
    @Mutation(() => Country)
    async createCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("continentCode") continentCode: string
    ): Promise<Country> {
        const country = new Country();
        country.code = code;
        country.name = name;
        country.emoji = emoji;
        country.continentCode = continentCode;

        await country.save();

        return country;
    }

    @Mutation(() => Boolean)
    async deleteCountry(@Arg("code") code: string): Promise<boolean> {
        const country = await Country.findOne({ where: { code } });
        if (!country) {
            throw new Error("Country not found");
        }

        await Country.delete({ code });

        return true;
    }

    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        return Country.find();
    }

    @Query(() => Country, { nullable: true })
    async countryByCode(@Arg("code") code: string): Promise<Country | null> {
        return Country.findOne({ where: { code } });
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg("continentCode") continentCode: string): Promise<Country[]> {
        return Country.find({ where: { continentCode } });
    }
}