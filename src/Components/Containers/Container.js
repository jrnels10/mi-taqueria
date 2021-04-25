import { Container } from "react-bootstrap"
import { useLocation } from "react-router"
import Navigation from "../Navigation/Navigation"

export const PageContainer = ({ children }) => {
    const location = useLocation();
    console.log(location)
    const clearBackground = location.pathname === '/' || location.pathname.includes('signin') || location.pathname.includes('signup')

    return <Container className={`container_page container_page--${clearBackground ? 'image' : 'color'} p-0`}>
        <div style={{ height: 'calc(100vh - 75px', position: 'relative' }}>
            {children}
        </div>
        <Navigation />
    </Container>

}