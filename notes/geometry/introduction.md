---
layout: geometry-section.njk
tags: [math-section]
title: "§1.1 Introduction"
summary: "Chapter 1: Curves — studying shape through local behavior and global structure."
topic: Mathematics
date: 2026-11-06
updated: 2026-11-06
draft: false
permalink: notes/geometry/introduction/index.html
---

## Two viewpoints

**Local differential geometry** examines a curve or surface near a chosen point. Derivatives describe nearby behavior, so the objects are expressed using functions with enough differentiability for the calculations involved.

**Global differential geometry** asks how local information restricts the entire curve or surface. Information near one point and conclusions about the whole object are different levels of understanding.

### A useful way to remember the distinction

- **Local:** What is the shape doing near this point?
- **Global:** What can those local properties tell us about the complete shape?

Tangent directions and curvature are examples of local questions. Whether a curve closes up is a global question; a small segment alone need not reveal the answer.

## Why calculus?

Calculus supplies tools for measuring change along a curve or across a surface. As a preview, a parametrized curve can be written

$$
\alpha:I\longrightarrow\R^3.
$$

Its derivative $\alpha'(t)$ describes velocity and, when nonzero, a tangent direction. Further derivatives help describe how the direction changes. These are geometric questions studied with analytic tools; the formal definitions come in later sections.

## Why start with curves?

The book builds toward surfaces, but curves provide local ideas and tools needed along the way. The introduction identifies parametrized curves, arc length, and the vector product as preliminary material in §1.2–1.4, and points to §1.5 as central to the chapter.

For a reader focusing on surfaces, do Carmo suggests reading §1.2–1.5. These notes will follow the chapter in order and keep each section on its own page.

## Personal reflection: why is the course called Geometry?

*My own reflection on the NCKU Mathematics course title, not content from do Carmo’s book.*

The NCKU Mathematics course is titled **Geometry**, rather than **Differential Geometry**. I was curious why a course with that broader title uses *Differential Geometry of Curves and Surfaces* as its textbook.

My initial picture of geometry came mostly from school: angles, congruence, similarity, and proofs about figures. This textbook approaches shape through curves, surfaces, and calculus, so it initially felt like a different subject.

I now see differential geometry as one part of geometry, rather than a subject outside it. It still asks geometric questions about shape and space, using tools such as derivatives and linear algebra to study tangents, lengths, and curvature.

From that perspective, a course called Geometry can reasonably focus on differential geometry. For students who have studied calculus and linear algebra, curves and surfaces also seem like a natural entry point into more advanced geometry.

This is my interpretation of how the course title and textbook fit together. It does not establish why the department or instructor chose this particular book; that would require checking the syllabus or asking the instructor.

## What to take away

The subject is geometry; calculus is a method for studying it. Keep local and global questions separate, and use this chapter on curves as preparation for the later study of surfaces.
