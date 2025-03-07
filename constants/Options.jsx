export const PracticeOptions = [
    {
        name: 'Quiz',
        image: require('../assets/images/quiz.png'),
        icon: require('../assets/images/quiz-logo.jpg'),
        path: '/practice/quiz'
    },
    {
        name: 'Flashcards',
        image: require('../assets/images/flashcard.png'),
        icon: require('../assets/images/flashcard-logo.jpg'),
        path: '/practice/flashcards'
    },
    {
        name: 'Que & Ans',
        image: require('../assets/images/notes.png'),
        icon: require('../assets/images/qa-logo.jpg'),
        path: '/practice/questionAnswers'
    }
]

export const imageAssets = {
    '/banner1.jpg': require('../assets/images/banner1.jpg'),
    '/banner2.jpg': require('../assets/images/banner2.jpg'),
    '/banner3.jpg': require('../assets/images/banner3.jpg'),
    '/banner4.jpg': require('../assets/images/banner4.jpg'),
    '/banner5.jpg': require('../assets/images/banner5.jpg'),
    '/banner6.jpg': require('../assets/images/banner6.jpg'),
    '/banner7.jpg': require('../assets/images/banner7.jpg'),
}

export const courseCategory = ['Tech & Coding', 'Buisness & Finance', 'Design', 'Marketing', 'Personal Development', 'Photography', 'Health & Fitness', 'Lifestyle', 'Language']

export const ProfileMenu = [
    {
        name: 'Add Course',
        icon: 'add-outline',
        path: '/addCourse'
    },
    {
        name: 'My Courses',
        icon: 'book',
        path: '/(tabs)/home'
    },
    {
        name: 'Course Progress',
        icon: 'analytics-outline',
        path: '/(tabs)/progress'
    },
    {
        name: 'My Subscription',
        icon: 'shield-checkmark',
        path: '/'
    },
    {
        name: 'Logout',
        icon: 'log-out',
        path: '/login'
    }
]