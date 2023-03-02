import { Request, Response, Router } from "express";
import { jobsController } from "../controllers/jobsController";
const router = Router();

router.get(
  "/getJobs",
  // jobsController.getAllJobs,
  // (req: Request, res: Response) => {
  //   return res.status(200).json(res.locals.jobs);
  // }
  (req: Request, res: Response) => {
    res.status(200).json([{"id": 0, "user_id": 5, "company": "We Tried", "salary": 0}, {"id": 1, "user_id": 5, "company": "I hate Redux", "salary": -10000, 'status': 'ghosted'}, {"id": 2, "user_id": 5, "company": "Netflix", "salary": 121212}], )
  }
);

router.post(
  "/createJob",
  jobsController.createJob,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.jobID);
  }
);

router.patch(
  "/update/:id",
  jobsController.updateJob,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.jobs);
  }
);

router.delete(
  "/delete/:id",
  jobsController.deleteJob,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.jobs);
  }
);

export default router;
