import { SlackEventsService } from "../services";
import Express from "express";

const eventsService = new SlackEventsService();

async function eventsController(req: Express.Request, res: Express.Response) {
  const body = req.body;
  const requestType = body?.type;
  console.log("RECIEVED REQUEST EVENTS", req.body);
  if (requestType === "url_verification") {
    return res.send({
      challenge: body.challenge,
    });
  }

  if (requestType === "event_callback") {
    const eventType = body.event.type;
    if (eventType === "app_mention")
      return await eventsService.appMention(req, res);
  }

  return res.send("OK").status(200);
}

export { eventsController };
