import { Request, Response, NextFunction } from "express";
const db = require("../models/postgreSQLmodel.ts");

interface CreateJobRequestBody {
  user_id: number;
  company?: string;
  title?: string;
  salary?: number;
  date?: string;
  applied?: boolean;
  status?: string;
  applied_with?: string;
}

interface CreateJobRequest extends Request {
  body: CreateJobRequestBody;
}

export const jobsController = {
  getAllJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = `SELECT * FROM jobs`;
      const data = await db.query(query);
      res.locals.jobs = data.rows[0];
      return next();
    } catch (err) {
      return next({
        status: 400,
        log: "Error in jobsController.getAllJobs",
        message: { err: "Error in jobsController.getAllJobs" },
      });
    }
  },

  createJob: async (
    req: CreateJobRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        user_id,
        company = null,
        title = null,
        salary = null,
        date = null,
        applied = null,
        status = null,
        applied_with = null,
      } = req.body;

      if (!user_id) {
        throw new Error("user_id is required");
      }

      const query = `INSERT INTO jobs (user_id, company, title, salary, date, applied, status, applied_with) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;
      const values = [
        user_id,
        company,
        title,
        salary,
        date,
        applied,
        status,
        applied_with,
      ];

      const data = await db.query(query, values);
      res.locals.jobs = data.rows[0];
      return next();
    } catch (err) {
      return next({
        status: 400,
        log: "Error in jobsController.createJob",
        message: { err: "Error in jobsController.createJob" },
      });
    }
  },

  updateJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = req.params.id;

      const {
        company = null,
        title = null,
        salary = null,
        date = null,
        applied = null,
        status = null,
        applied_with = null,
      } = req.body;

      const query = `UPDATE jobs SET 
                        company = COALESCE($1, company),
                        title = COALESCE($2, title),
                        salary = COALESCE($3, salary),
                        date = COALESCE($4, date),
                        applied = COALESCE($5, applied),
                        status = COALESCE($6, status),
                        applied_with = COALESCE($7, applied_with)
                     WHERE id = $8
                     RETURNING *`;

      const values = [
        company,
        title,
        salary,
        date,
        applied,
        status,
        applied_with,
        jobId,
      ];

      const data = await db.query(query, values);
      res.locals.jobs = data.rows[0];
      return next();
    } catch (err) {
      return next({
        status: 400,
        log: "Error in jobsController.updateJobs",
        message: { err: "Error in jobsController.updateJobs" },
      });
    }
  },

  deleteJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = req.params.id;
      const query = `DELETE FROM jobs WHERE id = $1`;
      const value = [jobId];
      const data = await db.query(query, value);
      res.locals.jobs = data.rows[0];
      return next();
    } catch (err) {
      return next({
        status: 400,
        log: "Error in jobsController.deleteJob",
        message: { err: "Error in jobsController.deleteJob" },
      });
    }
  },
};
