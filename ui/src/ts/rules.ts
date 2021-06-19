export default [
    {
        title: 'Registration of the application',
        rules: [
            'User must be authorized.',
            'Registration of an application for an auction includes 4 steps.',
            'Step 1: Checking the car for compliance with the basic requirements (production year must not be greater than 1970, car condition must be greater than 6 (on a scale of 1 to 10 )).',
            'Step 2: Retro car data input.',
            'Step 3: Auction data input.', 
            'Step 4: approval of the application by the administrator.',
        ],
    },
    {
        title: 'Admission to the auction',
        rules: [
            'User must be authorized.',
            'User must have at least 1000 dollars on the balance.',
        ],
    },
    {
        title: 'Holding the auction',
        rules: [
            'Auction has start price.',
            'Auction has minimum bid',
            'Maximum time without bet 5 minutes.',
            'The winner is the one who made the last bet.',
        ],

    },
    {
        title: 'The conditions of the transaction',
        rules: [
            'After the auction, the user must pay the remaining amount.',
            'If the user does not pay the remaining amount within 2 weeks, his victory is canceled. The deposit is not refundable.',
            'Delivery is carried out after payment within 1 month (depending on the region of the user).',
            'Delivery is paid by the user in full (including all taxes).',
        ],

    },
]
