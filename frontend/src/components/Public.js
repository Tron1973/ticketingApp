import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">ticketingApp</span></h1>
            </header>
            <main className="public__main">
                <p>Fullstack App that tracks tickets/notes as well as employee/user functions</p>
                <address className="public__addr">
                    TicketingApp<br />
                    123 Street Ave<br />
                    Anytown, USA<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public