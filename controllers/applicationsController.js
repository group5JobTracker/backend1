const { pool } = require('../db');
const { scrapePosting } = require('../utils');
const Application = require('../models/Application');

async function manualEntry(req, res) {
    const { userId, status, title, company, location, date, notes, contact, notif, color } = req.body

    try {
        const response = await Application.create(userId, status, title, company, location, contact, date, notes, notif, color)
        res.status(201).json({ post: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

async function autoEntry(req, res) {

    const { userId, url, status, date, contact, notif, color } = req.body
    const { description, title, company, location } = await scrapePosting(url);

    try {
        const response = await Application.create(userId, status, title, company, location, contact, date, description, notif, color)
        res.status(201).json({ post: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

async function searchUser(req, res) {
    const userId = req.params.id;
    try {
        const response = await Application.search(userId)
        res.status(201).json({ posts: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

async function getApplication(req, res) {
    const applicationId = req.params.id;
    try {
        const response = await Application.searchApps(applicationId);
        res.status(201).json({ posts: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

const deleteApplication = async(req, res) => {
    const applicationId = req.params.id;

    try {
        const response = await Application.delete(applicationId)
        console.log(response);
        res.status(204).json({ message: `Application with id ${applicationId} has been successfully deleted` })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

const editApplication = async(req, res) => {
    const { applicationId, column } = req.params
    const updatedValue = req.body.value
    try {
        const response = await Application.edit(column, updatedValue, applicationId)
        res.status(201).json({ post: response })

    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }

}

module.exports = {
    manualEntry,
    autoEntry,
    searchUser,
    getApplication,
    deleteApplication,
    editApplication
}