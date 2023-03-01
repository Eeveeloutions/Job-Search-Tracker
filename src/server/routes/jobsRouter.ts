import { Request, Response, Router } from "express";
import { jobsController } from "../controllers/jobsController";
const router = Router();

router.get(
  "/getJobs",
  jobsController.getAllJobs,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.jobs);
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
