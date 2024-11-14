import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-guard'
import { AuthContext } from './context/auth-context'
import InstructorDashboard from './pages/instructor'
import StudentViewCommonLayout from './components/student-view/common-layout'
import StudentHomePage from './pages/student/home'

const App = () => {
    
    const { auth } = useContext(AuthContext)

    return (
        <Routes>
            <Route 
                path='/auth' 
                element={
                    <RouteGuard
                        element={
                            <AuthPage/>
                        }
                        authenticated={auth?.authenticated}
                        user={auth?.user}
                    />
                }
            />

            <Route
                path='/instructor'
                element={
                    <RouteGuard 
                        element={
                            <InstructorDashboard/>
                        }
                        authenticated={auth?.authenticated}
                        user={auth?.user}
                    />
                }
            />

            <Route
                path='/'
                element={
                    <RouteGuard
                        element={
                            <StudentViewCommonLayout/>
                        }
                        authenticated={auth?.authenticated}
                        user={auth?.user}
                    />
                }
            >
                <Route path='home' element={<StudentHomePage/>}/>
            </Route>
        </Routes>
    )
}

export default App