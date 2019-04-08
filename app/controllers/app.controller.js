module.exports = app => {
    app.get('/app/pug', (req, res, next) => {
        res.render('index',
            {
                title: 'Express ngu a'
            }
        );
    });
};
