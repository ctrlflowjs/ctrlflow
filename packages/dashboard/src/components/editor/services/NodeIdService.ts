export class NodeIdService {
  nextId() {
    return crypto.randomUUID()
  }
}

export default new NodeIdService()
