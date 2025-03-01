import "./Footer.css"
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p className="footer__credits">Developed by <b>Abraham Tongi</b></p>
            <p className="footer__year">{currentYear}</p>
        </footer>
    )
}