export default function UserProfile({ UserProfile }) {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfileById().then(setUserProfile);
    }, []);


    return (
        <section>
            <h1>User Profile</h1>
            <h2>{userProfile.firstName} {userProfile.lastName}</h2>
            <h3>{userProfile.streetAddress}</h3>
            <h3>{userProfile.city}, {userProfile.state} {userProfile.zipCode}</h3>
            <h3>{userProfile.phoneNumber}</h3>
            <h3>{userProfile.email}</h3>
            <Button onClick={() => navigate("/userProfile/edit")}>Edit</Button>

        </section>
    )
}
