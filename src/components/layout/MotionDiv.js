import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

export default function MotionDiv(props) {
  const initial = props.initial || { x: "-100%" };

  return (
    <motion.div
      initial={initial}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ x: "100%" }}
    >
      <Container fluid className="py-3">
        {props.children}
      </Container>
    </motion.div>
  );
}
