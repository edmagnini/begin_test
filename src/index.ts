import { app } from "./app"
import { administratorRouter } from "./routes/administratorRouter"
import { bookRouter } from "./routes/bookRouter"
import { institutionRouter } from "./routes/institutionRouter"

app.use("/institution", institutionRouter)

app.use("/administrator", administratorRouter)

app.use("/book", bookRouter)