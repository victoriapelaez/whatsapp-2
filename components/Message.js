import styled from "styled-components"

function Message({ user, message }) {
    retunr(
        <Container>
            <p>{message}</p>
        </Container>
    )
}

export default Message

const Container = styled.div`

`;