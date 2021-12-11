



const register = useRegisterStore( state => state.add)
const unregister = useRegisterStore( state => state.remove)

useEffect(() => {
    register(props.endpointId, 'jukeboxhero')
    return function cleanup() {
        unregister(props.endpointId, 'jukeboxhero')
    };
// eslint-disable-next-line 
}, [])

export default function useRegister(devices) {

    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)
    const [ registeredDevices, setRegisteredDevices ] = useState([])

    useEffect(() => {
        if (type(devices) == str) {
            register(devices, 'jukeboxhero')
            setRegisteredDevices([devices])
        } else {
            devices.map( device)
        }
        return function cleanup() {
            unregister(props.endpointId, 'jukeboxhero')
        };
    // eslint-disable-next-line 
    }, [ devices ])
  
    return registeredDevices;
  }