module.exports = app => {
    app.get('/', (req, res, next) => {
        res.render('index',
            {
                title: 'Express ngu a'
            }
        );
    });
};
