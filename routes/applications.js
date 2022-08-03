const router = require('express').Router();
const { pool } = require('../db');
const applicationController = require('../controllers/applicationsController')

router.post('/create', applicationController.manualEntry)

router.post('/auto', applicationController.autoEntry)

router.get('/users/:id', applicationController.searchUser)

router.get('/:id', applicationController.getApplication)

router.delete('/:id', applicationController.deleteApplication)

router.patch('/edit/:id/:column', applicationController.editApplication);

module.exports = router;