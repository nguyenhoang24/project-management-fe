const   categories = [
    {
        name: 'Cảnh báo',
        value: 'bg-danger text-white'
    },
    {
        name: 'Thông báo',
        value: 'bg-info text-white'
    },
    {
        name: 'Nhắc nhở',
        value: 'bg-warning text-white'
    },
];

let calendarEvents = [
    {
        id: 1,
        title: 'All Day Event',
        start: new Date().setDate(new Date().getDate() + 1),
        className: 'bg-primary text-white',
    },
    {
        id: 2,
        title: 'Long Event',
        start: new Date().setDate(new Date().getDate() - 5),
        end: new Date().setDate(new Date().getDate() -3),
        className: 'bg-warning text-white',
    },
    {
        id: 3,
        title: 'Repeating Event',
        start: new Date().setDate(new Date().getDate() - 3),
        className: 'bg-info text-white',
    },
    {
        id: 4,
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() + 4),
        className: 'bg-success text-white'
    }
];

export { categories, calendarEvents };
