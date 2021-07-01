import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function pokemon({ name, imageUrl, weight, height, types, id }) {
    return (
        <Layout title={name}>
        <div className="border p-4 border-gray my-2 text-lg text-black dark:text-white bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded-md shadow-md">
            <h1 className="text-4xl mb-2 text-center capitalize">{name}</h1>

            <div className="flex items-center justify-center">
            <Image
                src={imageUrl}
                alt={name}
                width="200"
                height="200"
                layout="fixed"
            />
            </div>

            <p>
            <span className="font-bold mr-2">Weight: </span> {weight}
            </p>

            <p>
            <span className="font-bold mr-2">Height: </span> {height}
            </p>

            <h2 className="text-2xl mt-6 mb-2 font-bold">Types</h2>

            <ul>
            {types.map((type) => (
                <li key={type.type.name} className="flex items-center mt-2">
                    {type.type.name}
                </li>
            ))}
            </ul>
        </div>
        <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">Home</a>
                </Link>    
        </p>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const { id } = query;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await response.json();

        const paddedIndex = ('00' + id).slice(-3);
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

        return {
        props: {
            ...pokeman,
            imageUrl,
        },
        };
    } catch (err) {}

    const user = await githubApiService.fetchUserData(userName);
    const repositories = await githubApiService.fetchRepositories(userName);

    return {
        props: {
        user,
        repositories,
        },
        revalidate: 60,
    };
};