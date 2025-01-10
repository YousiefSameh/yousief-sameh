import { useSelector } from "react-redux"
import store from "../store/store"

const Projects = () => {
  const { projects } = useSelector(() => store.getState().projects);
  console.log(projects)
  return (
    <div>Projects</div>
  )
}

export default Projects