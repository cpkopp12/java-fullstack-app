const person = {
    name: 'cam',
    address: {
        line1: '123 Baker St',
        city: 'london',
        country: 'UK'
    },
    profiles: ['twitter','linkedin','instagram']
    // printProfile: () => {
    //     person.profiles.map(
    //         (profile) => {
    //             console.log(profile);
    //         }
    //     )
    
}

export default function LearningJS() {
    return (
        <>
        <div>{ person.name }</div>
        <div>{ person.address.city }</div>
        {/* <div>{ person.profiles[1] }</div>
        <div>{ person.printProfile() }</div> */}
        </>
    )
}