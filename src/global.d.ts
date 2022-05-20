type NewsType = {
  id: number
  created_at: string
  author: string
  title: string
  url: string
}

type NewsResponseType = {
  author: string
  comment_text: string | null
  created_at: string
  created_at_i: number
  num_comments: number | null
  objectID: number
  parent_id: number | null
  points: number | null
  story_id: number
  story_text: string | null
  story_title: string | null
  story_url: string | null
  title: string | null
  url: string | null
}