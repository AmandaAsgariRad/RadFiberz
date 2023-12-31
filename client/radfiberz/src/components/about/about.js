import { Container } from "reactstrap";

export default function About() {
    return (
        <Container style={{ paddingBottom: '10rem' }}>
            <h1 className="mt-5 mb-4 text-center">About</h1>
            <p className="lead text-justify">
                Hello, my name is Amanda, and I am the proud owner of RadFiberz! Since
                2017, I have been creating unique and beautiful art pieces that have been
                showcased in various booths, shows, and businesses. My passion for
                crafting has led me to use only the finest materials, including polymer
                clay, metals, fibers, and dyes, to create one-of-a-kind, handcrafted
                items. If you have any questions or inquiries, please do not hesitate to
                reach out to me through the contact options listed. Thank you for
                supporting small businesses and for taking the time to check us out!
            </p>
        </Container>
    );
}
