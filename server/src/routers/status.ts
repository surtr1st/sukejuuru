import { StatusRoute } from "@/enums";
import { useStatus } from "@/services";
import { Hono } from "hono";

const status = new Hono()
const service = useStatus()

status.get(StatusRoute.RETRIEVE, async (c) => c.json(await service.list()))

export { status }