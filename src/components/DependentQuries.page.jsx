import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
}

export const DependentQuriesPage = ({ email }) => {
    const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery(
        ['user', email], 
        () => fetchUserByEmail(email)
    );

    const channelId = user?.data.channelId;

    const { data: courses, isLoading: isCoursesLoading, isError: isCoursesError, error: coursesError } = useQuery(
        ['courses', channelId], 
        () => fetchCoursesByChannelId(channelId), 
        {
            enabled: !!channelId,
        }
    );

    return (
        <div>
            <h2>Dependent Queries Page</h2>
            {isUserLoading && <p>Loading user data...</p>}
            {isUserError && <p>Error loading user data: {userError.message}</p>}
            {user && (
                <div>
                    <h3>User Details</h3>
                    <p>Email: {user.data.email}</p>
                    <p>Channel ID: {user.data.channelId}</p>
                </div>
            )}

            {isCoursesLoading && <p>Loading courses...</p>}
            {isCoursesError && <p>Error loading courses: {coursesError.message}</p>}
            {courses && Array.isArray(courses.data) && (
                <div>
                    <h3>Courses</h3>
                    <ul>
                        {courses.data.map((course) => (
                            <li key={course.id}>{course.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {courses && !Array.isArray(courses.data) && <p>No courses available or unexpected data format.</p>}
        </div>
    );
}
