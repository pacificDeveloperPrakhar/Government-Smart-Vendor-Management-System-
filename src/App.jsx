import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.jsx";
import Layout from "./Layouts/Layout.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import Profile from "./components/client/auth/RegisterProfile.jsx";
import {useLoadingBar} from "react-top-loading-bar"
import { useSelector } from "react-redux";
import Student from "./components/student/StudentDashboard.jsx"
import {
  RegisterCompany,
  PostJob,
  RegisterStudent,
  ApplyJob,
  Login,
} from "./components/index.js";
import {
  Home,
  Contact,
  AboutUs,
  ProductSales,
  Error404,
  Vacancy,
  AdminLogin,
  StudentLogin,
  CompanyLogin,
  CompaniesList,
  Applications,
  ManageProducts,
  ToolsOrderList,
  ContactResponse,
  Courses,
} from "./pages/index.js";
import ProfileRouted from "./utils/RoutingManager/ProfileRouted.jsx";
import MaskedRoutes from "./utils/RoutingManager/MaskedRoutes.jsx";

function App() {
  const userLoading = useSelector(state => state.user.isLoading);
  const companyLoading = useSelector(state => state.company.isLoading);
  const jobLoading = useSelector(state => state.job.isLoading);
  const loading = userLoading || companyLoading||jobLoading;
  
  const { start, complete } = useLoadingBar({
    color: "#ff7e5f", // Orange shade from your gradient theme
    height: 4, // Adjust thickness
    shadow: true,
    transitionTime: 500, // Smooth transition
  });
  
  if(loading)
  {  
      start();
  }
  else
  {
      complete();
  }
  return (
  
      <Router>
        <div className="h-screen">
          <Routes>
            {/* routes related to the main website */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
               <Route path="upload" element={<PostJob/>}></Route>
              <Route path="about" element={<AboutUs />} />
              <Route path="login" element={<Login />} />
              <Route path="registration/human_resource" element={<Profile />} />
              <Route path="Me" element={<ProfileRouted roles={[]}/>}>
              <Route path="" element={< Student/>} />
              </Route>

              {/* routes related to company */}
              <Route path="company">
                <Route index element={<CompanyLogin />} />
                <Route path="job/post" element={<PostJob />} />
              </Route>
              {/* routes related to student */}
              <Route path="student">
                <Route index element={<StudentLogin />} />
                <Route path="" element={<MaskedRoutes/>}>
                <Route path="job/apply" element={<ApplyJob />} />
                </Route>
              </Route>
            </Route>
            {/* routes related to admin */}
            <Route path="/admin" element={<AdminLayout />}>

            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
  
  );
}

export default App;
