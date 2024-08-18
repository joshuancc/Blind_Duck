import TestComponent from "../components/TestComponent"
import test_image from "../assets/maxresdefault.jpg"

const TestPage = () => {
    return (
        <>
            <TestComponent/>
            <TestComponent/>
            <img src={test_image}></img>
        </>
    )
}

export default TestPage
