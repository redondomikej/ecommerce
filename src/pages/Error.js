import Banner from '../components/Banner';

export default function Error() {

    const data = {
        title: "Error 404 - Page not found.",
        content: "The page you are looking for cannot be found.",
        destination: "/",
        label: "Back to Home"
    }

    return (
        <Banner data={data} />
    )
}